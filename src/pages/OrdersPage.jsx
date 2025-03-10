import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableActionCell,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup
} from "@/components/ui/select";
import { useOrders } from "../routes/OrdersRoute";
import { Button } from "../components/ui/button"

const OrdersPage = () => {
  const result = useOrders();
  const pagination = result.data.pagination;
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
      {/* สถานะคำสั่งซื้อ */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="สถานะคำสั่งซื้อ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>สถานะคำสั่งซื้อ</SelectLabel>
              {result.statuses.map((item) => (
                <SelectItem key={item.ID} value={item.ID}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button size="sm">
          ฟิลเตอร์
        </Button>
        <Button size="sm" variant="destructive">
          ยกเลิก
        </Button>
      </div>
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
              <TableHead className="w-48">วันที่สั่งซื้อ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.data.orders.map((row, index) => (
              <TableRow key={row.ID}>
                <TableActionCell title={row.ID}>
                  <EditLink to={`/orders/${row.ID}`} />
                </TableActionCell>
                <TableCell>{row.Service.name}</TableCell>
                <TableCell>{row.Type.name}</TableCell>
                <TableCell>{row.User.firstname + " " + row.User.lastname}</TableCell>
                <TableCell>{row.orderDetail?.price}</TableCell>
                <TableCell>{row.Status.name}</TableCell>
                <TableCell>{row.CreatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-[--gray]">
            แสดง {result.data.orders.length} จากทั้งหมด {pagination.totalRecords}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  isActive={pagination.currentPage === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  isActive={pagination.currentPage === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm">{pagination.currentPage}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={
                    (pagination.currentPage === pagination.totalPages || pagination.totalPages <= 0)
                      ? false
                      : true
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  isActive={
                    (pagination.currentPage === pagination.totalPages || pagination.totalPages <= 0)
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
