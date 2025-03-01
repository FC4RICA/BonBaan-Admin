import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
import { useUsers } from "../routes/usersRoute";

const usersData = {
  data: [
    {
      id: "1",
      username: "supppppp",
      name: "ชาญ ชาลาล่า",
      email: "chacha@gmail.com",
      orders: 3,
      totalSpend: 9000,
      createdAt: new Date(Date.now()).toLocaleString(),
    },
  ],
  totalPage: 1,
  currentPage: 1,
  totalRecord: 1,
  pageSize: 4,
};

const UsersPage = () => {
  const result = useUsers();
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/* filter buttons */}
      <div className="flex flex-col gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อผู้ใช้</TableHead>
              <TableHead>ชื่อ นามสกุล</TableHead>
              <TableHead>อีเมล</TableHead>
              <TableHead>จำนวนการซื้อ</TableHead>
              <TableHead>ยอดการซื้อ</TableHead>
              <TableHead className="w-48" >วันที่สมัครสมาชิก</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.firstname + " " + item.lastname}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.orders}</TableCell>
                <TableCell>{item.totalSpend}</TableCell>
                <TableCell>{item.CreatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          {/* <div className="flex items-center text-sm text-[--gray]">
            แสดง {usersData.data.length} จากทั้งหมด {usersData.totalRecord}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  isActive={usersData.currentPage === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  isActive={usersData.currentPage === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={
                    usersData.currentPage === usersData.totalPage
                      ? false
                      : true
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  isActive={
                    usersData.currentPage === usersData.totalPage
                      ? false
                      : true
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;