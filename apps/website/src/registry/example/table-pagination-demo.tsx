import { useEffect, useState } from "react"

import { Star } from "lucide-react"

import Pagination from "@/registry/ui/pagination"
import MainTable from "@/registry/ui/table"

interface Product {
	id: number
	title: string
	price: number
	category: string
	image: string
	rating: { rate: number; count: number }
}

const Demo = () => {
	const [cloth, setCloth] = useState<Product[]>([])
	const [currentPage, setCurrentPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const indexL = currentPage * rowsPerPage
	const index1 = indexL - rowsPerPage
	const clothData = cloth.slice(index1, indexL)

	useEffect(() => {
		const fetchClothing = async () => {
			try {
				const response = await fetch("https://fakestoreapi.com/products")
				const data: Product[] = await response.json()
				setCloth(data)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchClothing()
	}, [])

	const clothColumn = [
		{
			id: "image",
			accessorKey: "image",
			header: "Image",
			cell: ({ row }: { row: { original: Product } }) => <img src={row.original.image} alt={row.original.title} className="h-20 w-20 rounded-xl object-cover" />,
			size: 10,
		},
		{
			id: "title",
			accessorKey: "title",
			header: "Title",
			cell: ({ row }: { row: { original: Product } }) => <span className="w-[10rem] md:w-full">{row.original.title}</span>,
			enableSorting: true,
			size: 400,
		},
		{
			id: "price",
			accessorKey: "price",
			header: "Price",
			size: 10,
		},
		{
			id: "rating",
			accessorKey: "rating",
			header: "Rating",
			cell: ({ row }: { row: { original: Product } }) => (
				<div className="flex items-center gap-2">
					<Star className="h-6 w-6 text-yellow-500" />
					<span>{row.original.rating.rate}</span>
				</div>
			),
			size: 10,
		},
		{
			id: "category",
			accessorKey: "category",
			header: "Category",
			enableColumnFilter: false,
			size: 10,
		},
	]

	return (
		<div>
			<MainTable data={clothData} columns={clothColumn} verticalLine={true} />

			<div className="my-10">
				<Pagination totalPage={cloth.length} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} onRowsPerPageChange={(rows) => setRowsPerPage(rows)} />
			</div>
		</div>
	)
}

export default Demo
