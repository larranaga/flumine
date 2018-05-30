import * as ts from 'typescript';

const printer: ts.Printer = ts.createPrinter();

const source: string = `function someFunction() { alert("Hello!!"); }`;

const transformer = <T extends ts.Node>(context: ts.TransformationContext) => (rootNode: T) => {
    function visit(node: ts.Node): ts.Node {
        node = ts.visitEachChild(node, visit, context);

        if(node.kind === ts.SyntaxKind.FunctionDeclaration) {
            const declaration = node as ts.FunctionDeclaration;
            const statements = declaration.body.statements;
            const newStatements = statements.concat(statements);

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

const sourceFile: ts.SourceFile = ts.createSourceFile(
    'test.ts', source, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS
);

console.log(printer.printFile(sourceFile));

// Options may be passed to transform
const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(
    sourceFile, [transformer]
);

const transformedSourceFile: ts.SourceFile = result.transformed[0];


console.log(printer.printFile(transformedSourceFile));

result.dispose();