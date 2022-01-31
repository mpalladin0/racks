export = {
    input: ["src/users/controllers"],
    output: ["src/sdk"],
    compilerOptions: {
        "moduleResolution": "node",
        "module": "commonjs",
        "strict": false,
        "removeComments": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true,
        "target": "es2017",
        "sourceMap": true,
        "baseUrl": ".",
        "paths": {
            "*": ["*", "src/*"]
        },
        "incremental": true,
        "skipLibCheck": true
    }
};