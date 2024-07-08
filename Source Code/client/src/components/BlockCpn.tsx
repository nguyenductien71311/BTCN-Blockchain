import { BlockType } from "@/types";

interface PropType {
  block: BlockType;
}

const BlockCpn = (props: PropType) => {
  const { block } = props;

  return (
    <div className="p-2 border border-red-500">
      <h3>Hash: {block?.hash}</h3>
      <p>Timestamp: {block?.timestamp}</p>
      <p>Previous hash: {block?.previousHash}</p>
      <p>Transactions: {JSON.stringify(block?.transactions)}</p>
    </div>
  );
};

export default BlockCpn;
