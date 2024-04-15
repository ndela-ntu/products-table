import { deleteProduct } from "@/app/lib/actions";

export default function DeleteProduct({id}: {id: string;}) {
    const deleteProductWithId = deleteProduct.bind(null, id);

    return (
        <form action={deleteProductWithId}>
            <button className="btn text-sm text-white transition-colors hover:bg-[#326AE2] bg-[#2563EB] rounded-md" type="submit">
                Delete
            </button>
        </form>
    );
}