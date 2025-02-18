import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableActionCell
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { EditLink } from "../components/shared/link";

const ordersData = {
  data: [
    {
      id: "9e1c2987",
      service: {
        name: "พระตรีมูรติ",
      },
      type: "บนบาน",
      name: "ชาญ ชาลาล่า",
      price: 300,
      status: {
        id: "1",
        name: "กำลังดำเนินการ"
      },
      createdAt: new Date(Date.now()).toLocaleString(),
    },
  ],
  totalPage: 1,
  currentPage: 1,
  totalRecord: 1,
  pageSize: 4,
};

const OrdersPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/* filter buttons */}
      <div className="flex flex-col gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>หมายเลขคำสั่งซื้อ</TableHead>
              <TableHead>ชื่อบริการ</TableHead>
              <TableHead>ประเภท</TableHead>
              <TableHead>ชื่อผู้ใช้</TableHead>
              <TableHead>ราคา</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead className="w-48" >วันที่สั่งซื้อ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData.data.map((row, index) => (
              <TableRow key={index}>
                <TableActionCell title={row.id}>
                  <EditLink to={`/orders/${row.id}`} />
                </TableActionCell>
                <TableCell>{row.service.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.status.name}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-[--gray]">
            แสดง {ordersData.data.length} จากทั้งหมด {ordersData.totalRecord}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  isActive={ordersData.currentPage === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  isActive={ordersData.currentPage === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={
                    ordersData.currentPage === ordersData.totalPage
                      ? false
                      : true
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  isActive={
                    ordersData.currentPage === ordersData.totalPage
                      ? false
                      : true
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;