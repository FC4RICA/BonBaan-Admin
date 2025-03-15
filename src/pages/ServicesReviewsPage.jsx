import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableActionCell,
  TableFormCell,
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
import Rating from "../components/shared/Rating";
import { useReviews } from "../routes/reviewsRoute";

const PAGE_SIZE = 8;

const ServicesReviewsPage = () => {
  const result = useReviews();
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(result.length / PAGE_SIZE) || 1;
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    const start = PAGE_SIZE * (page - 1);
    const end = start + PAGE_SIZE;
    setPageData(result.slice(start, end));
  }, [page, result]);

  return (
    <div className="flex flex-col gap-4">
      {/* filter buttons */}
      <div className="flex flex-col gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อผู้ใช้</TableHead>
              <TableHead>ชื่อบริการ</TableHead>
              <TableHead>คะแนน</TableHead>
              <TableHead>รีวิว</TableHead>
              <TableHead className="w-48">วันที่</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length > 0 ? pageData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{}</TableCell>
                <TableCell>{item.service_id}</TableCell>
                <TableCell>
                  <Rating value={item.rating} />
                </TableCell>
                <TableCell>{item.detail}</TableCell>
                <TableCell>{item.CreatedAt}</TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell colSpan="5">
                ไม่พบข้อมูลรีวิว
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-[--gray]">
            แสดง {pageData.length} จากทั้งหมด {result.length}
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
                  isActive={page === totalPage ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  onClick={() => setPage(totalPage)}
                  isActive={page === totalPage ? false : true}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ServicesReviewsPage;
