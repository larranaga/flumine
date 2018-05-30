import { readFileSync } from "fs";
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
                                    (ts.createIdentifier("appendFileSync"), 
                                    ts.createIdentifier("myAppendFileSync"))]
                            )
                ),
                        /*moduleSpecifier*/ ts.createLiteral("fs"));
            return ts.updateSourceFileNode(file, [importStar]);
        }

        if(node.kind === ts.SyntaxKind.FunctionDeclaration) {
            const declaration = node as ts.FunctionDeclaration;
            const statements = declaration.body.statements;
            const newStatements = statements.concat(statements).concat(statements);

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

        return node;
    }

    return ts.visitNode(rootNode, visit);
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
    // Parse a file
    let sourceFile = ts.createSourceFile(fileName, readFileSync(fileName).toString(), ts.ScriptTarget.ES2015, /*setParentNodes */ true);

    console.log(printer.printFile(sourceFile));

    // Options may be passed to transform
    const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(
        sourceFile, [transformer]
    );

    const transformedSourceFile: ts.SourceFile = result.transformed[0];


    console.log(printer.printFile(transformedSourceFile));

    result.dispose();
});
