function RawBlock(data) {
    this.ver = data.ver;
    this.next_block = data.next_block[0];
    this.time = data.time;
    this.bits = data.bits;
    this.fee = data.fee;
    this.nonce = data.nonce;
    this.n_tx = data.n_tx;
    this.size = data.size;
    this.block_index = data.block_index;
    this.main_chain = data.main_chain;
    this.height = data.height;
    this.weight = data.weight;
    this.tx_length = data.tx.length;
    this.tx_data = data.tx.slice(0, 10); // too much data, just show first 10
    this.hash = data.hash;
    this.prev_block = data.prev_block;
    this.mrkl_root = data.mrkl_root;

}

export default RawBlock;
