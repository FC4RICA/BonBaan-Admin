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
import { EditLink } from "../components/shared/link";
import { Plus } from "lucide-react";
import { Link, useSubmit } from "react-router";
import { useEffect, useState } from "react";
import { DeleteConfirmationAlert } from "../components/shared/alert";
import { useServices } from "../routes/servicesRoute";
import { getServices } from "../api/serviceApi";

const ServicesPage = () => {
  const { services: initialServices, pagination } = useServices();
  const [services, setServices] = useState(initialServices);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1 && services != initialServices) return setServices(initialServices)
    
    getCurrentServicesPage();
  }, [page]);

  const getCurrentServicesPage = async () => {
    const response = await getServices(page);
    setServices(response.data.services);
  };

  const submit = useSubmit();
  const deleteService = (id) => {
    submit(id, {method: "POST"})
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <Link to={"./insert"} className="btn btn-primary btn-md">
          <Plus />
          เพิ่มบริการใหม่
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[72px]">รูป</TableHead>
              <TableHead>ชื่อบริการ</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead>คะแนน</TableHead>
              <TableHead>วันที่แก้ไขล่าสุด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length > 0 ? services.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={row.attachments[0].url}
                    alt=""
                    className="aspect-square object-cover h-fit"
                  />
                </TableCell>
                <TableActionCell title={row.name}>
                  <EditLink to={`/services/${row.id}`} />
                  <DeleteConfirmationAlert
                    title={row.name}
                    onConfirm={() => deleteService(row.id)}
                  />
                </TableActionCell>
                <TableCell>
                  {row.categories.map((item) => item.name).join(" ")}
                </TableCell>
                <TableCell>{row.rate}</TableCell>
                <TableCell>{row.UpdatedAt}</TableCell>
              </TableRow>
            )) : 
            <TableRow>
              <TableCell colSpan="5">
                ไม่พบข้อมูลบริการ
              </TableCell>
            </TableRow>}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-[--gray]">
            แสดง {services.length} จากทั้งหมด {pagination.totalRecords}
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

export default ServicesPage;
