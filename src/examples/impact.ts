import { readFileSync, writeFileSync } from "fs";
import * as ts from 'typescript';

const printer: ts.Printer = ts.createPrinter();

const transformer = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
    function visit(node: ts.Node): ts.Node {
        node = ts.visitEachChild(node, visit, context);

        if(node.kind === ts.SyntaxKind.SourceFile) {
            const file = node as ts.SourceFile;

            const importStar = ts.createImportDeclaration(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*importClause*/ ts.createImportClause(
                            /*name*/ undefined,
                            ts.createNamedImports(
                                [ts.createImportSpecifier
                                    (ts.createIdentifier("myEnterHook"), 
                                    ts.createIdentifier("myEnterHook")),

                                    ts.createImportSpecifier
                                        (ts.createIdentifier("myExitHook"),
                                        ts.createIdentifier("myExitHook"))]
                            )
                ),
                        /*moduleSpecifier*/ ts.createLiteral("./hooks"));
            
            const newStatements = [importStar as ts.Statement].concat(file.statements);
            return ts.updateSourceFileNode(file, newStatements);
        }

        if(node.kind === ts.SyntaxKind.FunctionDeclaration) {
            const declaration = node as ts.FunctionDeclaration;
            const statements = declaration.body.statements;
            
            const name = declaration.name ? declaration.name.escapedText : "unnamed";

            const info = {name: name, position: JSON.stringify(declaration.pos)}
            const enterHook = ts.createCall(ts.createIdentifier("myEnterHook"), undefined, [ts.createLiteral(JSON.stringify(info))]);
            const ent = ts.createStatement(enterHook);

            const exitHook = ts.createCall(ts.createIdentifier("myExitHook"), undefined, [ts.createLiteral(JSON.stringify(info))]);
            const newStatements = [ent as ts.Statement].concat(statements).concat([ts.createStatement(exitHook)]);

            return ts.createFunctionDeclaration(
                declaration.decorators,
                declaration.modifiers,
                declaration.asteriskToken,
                declaration.name,
                declaration.typeParameters,
                declaration.parameters,
                declaration.type,
                ts.createBlock(newStatements, /*multiline*/ true),
            )
        }

        // if(node.kind === ts.SyntaxKind.FunctionExpression) {
        //     const expr = node as ts.FunctionExpression;

        //     return ts.createFunctionExpression(
        //         expr.modifiers,
        //         expr.asteriskToken,
        //         expr.name,
        //         expr.typeParameters,
        //         expr.parameters,
        //         expr.type,
        //         expr.body
        //     )
        // }

        return node;
    }

    return ts.visitNode(rootNode, visit);
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
    // Parse a file
    let sourceFile = ts.createSourceFile(fileName, readFileSync(fileName).toString(), ts.ScriptTarget.ES2015, /*setParentNodes */ true);

    //console.log(printer.printFile(sourceFile));

    //console.log("***********************");

    // Options may be passed to transform
    const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(
        sourceFile, [transformer]
    );

    const transformedSourceFile: ts.SourceFile = result.transformed[0];


    const newContent = printer.printFile(transformedSourceFile);
    writeFileSync("gen/" + fileName, newContent);
    result.dispose();
});
