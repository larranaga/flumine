function M(){
    console.log("M");
    A();
    A();
    B();
}

function A(){
    console.log("A");
}

function B(){
    console.log("B");
    C();
}

function C(){
    console.log("C");
    D();
}

function D(){
    console.log("D");
}

M();