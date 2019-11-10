"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// our example model is just an Array
function BasicBlock(data) {
    this.height = data.height;
    this.hash = data.hash;
    this.time = data.time;
    this.main_chain = data.main_chain;
}

exports.default = BasicBlock;
//# sourceMappingURL=BasicBlock.js.map