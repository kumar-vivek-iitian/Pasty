import { getPaste } from "@/components/db/db";
import PasteareaReadOnly from "@/components/PasteareaReadOnly";

const Paste = async ({ params }: { params: { id: string } }) => {
  await params;
  const id = await params.id;
  const paste = await getPaste(id);
  return <PasteareaReadOnly paste={paste}/>;
};

export default Paste;
