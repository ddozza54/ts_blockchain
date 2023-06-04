import crypto from "crypto";

interface BlockShape {
  hash: string;
  preHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public preHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(preHash, height, data);
  }

  static calculateHash(preHash: string, height: number, data: string) {
    const toHash = `${preHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  private getPrevHash() {
    //첫번째 해시가 없는 경우
    if (this.blocks.length === 0) return "";
    //해시가 있는 경우 가장 마지막 블럭의 해시값을 리턴.
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    //블럭이 생기면 바로 해싱하고 있음.
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    //그리고 생성한 블럭을 바로 blocks 에 넣어주면 됨.
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    //블럭을 보여줄 수 있는 함수 - 사실 보안상 엄청난 문제임.
    return this.blocks;
  }
}

const blockChain = new Blockchain();

blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");

console.log(blockChain.getBlocks());
