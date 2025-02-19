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
        name: "กำลังดำเนินการ",
      },
      createdAt: new Date(Date.now()).toLocaleString(),
    },
  ],
  totalPage: 1,
  currentPage: 1,
  totalRecord: 1,
  pageSize: 4,
};

const statusData = {
  status: [
    {
      id: "2",
      name: "รอรับออเดอร์",
    },
    {
      id: "3",
      name: "กำลังดำเนินการ",
    },
    {
      id: "4",
      name: "รอการยืนยัน",
    },
    {
      id: "5",
      name: "สำเร็จ",
    },
    {
      id: "6",
      name: "ยกเลิก",
    },
  ],
};

const typesData = {
  types: [
    {
      id: "1",
      name: "บนบาน",
    },
    {
      id: "2",
      name: "แก้บน",
    }
  ],
};

const packagesData = {
  packages: [
    {
      id: "1",
      name: "แพ็กเกจ",
    },
    {
      id: "2",
      name: "คำสั่งซื้อพิเศษ",
    }
  ],
};

const OrdersPage = () => {
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
      {/* สถานะคำสั่งซื้อ */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="สถานะคำสั่งซื้อ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>สถานะคำสั่งซื้อ</SelectLabel>
              {statusData.status.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* หมวดหมู่ */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="หมวดหมู่" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>หมวดหมู่</SelectLabel>
              {typesData.types.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* ประเภทคำสั่งซื้อ */}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ประเภทคำสั่งซื้อ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ประเภทคำสั่งซื้อ</SelectLabel>
              {packagesData.packages.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
