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
import { useEffect, useState } from "react";
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
import { getOrders } from "../api/orderApi";

const OrdersPage = () => {
  const { statuses ,orders: initialOrders, pagination } = useOrders();
    const [orders, setOrders] = useState(initialOrders);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      if (page === 1 && orders != initialOrders) return setOrders(initialOrders)
  
      getCurrentServicesPage();
    }, [page]);
  
    const getCurrentServicesPage = async () => {
      const response = await getOrders(page);
      setOrders(response.data.orders);
    };
  
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
              {statuses.map((item) => (
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
            {orders.length > 0 ? orders.map((row, index) => (
              <TableRow key={row.ID}>
                <TableActionCell title={row.ID}>
                  <EditLink to={`/orders/${row.ID}`} />
                </TableActionCell>
                <TableCell>{row.Service.name}</TableCell>
                <TableCell>{row.OrderType.name}</TableCell>
                <TableCell>{row.User.firstname + " " + row.User.lastname}</TableCell>
                <TableCell>{row.orderDetail?.price}</TableCell>
                <TableCell>{row.Status.name}</TableCell>
                <TableCell>{row.CreatedAt}</TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell colSpan="5">
                ไม่พบข้อมูลคำสั่งซื้อ
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-[--gray]">
            แสดง {orders.length} จากทั้งหมด {pagination.totalRecords}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  onClick={() => setPage(1)}
                  isActive={page === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => prev - 1)}
                  isActive={page === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => prev + 1)}
                  isActive={page >= pagination.totalPages ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  onClick={() => setPage(pagination.totalPages)}
                  isActive={page >= pagination.totalPages ? false : true}
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
