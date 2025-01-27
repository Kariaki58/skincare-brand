import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"



export default function ProductInfo() {
    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10">
            <Table className="border border-black">
                <TableBody>
                    <TableRow className="border border-black">
                        <TableCell className="p-4 border-r border-black">Brand</TableCell>
                        <TableCell className="p-4 border-r border-black">By Mills</TableCell>
                    </TableRow>
                    <TableRow className="border border-black">
                        <TableCell className="p-4 border-r border-black">Model</TableCell>
                        <TableCell className="p-4 border-r border-black">Model A</TableCell>
                    </TableRow>
                    <TableRow className="border border-black">
                        <TableCell className="p-4 border-r border-black">Color</TableCell>
                        <TableCell className="p-4 border-r border-black">Black</TableCell>
                    </TableRow>
                    <TableRow className="border border-black">
                        <TableCell className="p-4 border-r border-black">Material</TableCell>
                        <TableCell className="p-4 border-r border-black">Plastic</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </div>
    )
}