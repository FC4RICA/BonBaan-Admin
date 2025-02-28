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
import { useState } from "react";
import {
  CreateCategoryForm,
  EditCategoryForm,
} from "../components/forms/categoryForm";
import { DeleteConfirmationAlert } from "../components/shared/alert";
import { useCategories } from "../routes/categoriesRoute";
import { useSubmit } from "react-router";

const PAGE_SIZE = 20;

const ServicesCategoriesPage = () => {
  const result = useCategories();
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(result.length / PAGE_SIZE) || 1;
  const [editedRow, setEditedRow] = useState("");
  
  const submit = useSubmit();
  const onCreateCategory = (value) => {
    const formData = new FormData();
    formData.append("intent", "create");
    formData.append("name", value.name);

    submit(formData, { method: "post", action: "/services/categories" });
  };

  const onUpdateCategory = (id, value) => {
    const formData = new FormData();
    formData.append("intent", "update");
    formData.append("id", id);
    formData.append("name", value.name);

    submit(formData, { method: "post", action: "/services/categories" });
  };

  const onDeleteCategory = (id) => {
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", id);

    submit(formData, { method: "post", action: "/services/categories" });
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col w-96 gap-8">
        <h3>เพิ่มหมวดหมู่ใหม่</h3>
        <CreateCategoryForm onSubmit={onCreateCategory} />
      </div>
      <div className="flex flex-col gap-2 w-full ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ชื่อหมวดหมู่</TableHead>
              <TableHead>จำนวน</TableHead>
              <TableHead>วันที่แก้ไขล่าสุด</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.map((row, index) => (
              <TableRow key={row.ID}>
                {editedRow === index ? (
                  <TableFormCell
                    colSpan={3}
                    title="แก้ไขหมวดหมู่"
                    form={
                      <EditCategoryForm
                        name={row.name}
                        onSubmit={(value) => onUpdateCategory(row.ID, value)}
                        onCancel={() => setEditedRow("")}
                      />
                    }
                  />
                ) : (
                  <>
                    <TableActionCell title={row.name}>
                      <button
                        className="btn btn-link p-0 h-min min-h-min"
                        onClick={() => setEditedRow(index)}
                      >
                        แก้ไข
                      </button>
                      <DeleteConfirmationAlert
                        title={row.name}
                        onConfirm={() => onDeleteCategory(row.ID)}
                      />
                    </TableActionCell>
                    <TableCell>{row.Count}</TableCell>
                    <TableCell>{row.UpdatedAt}</TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between">
          <div className="flex items-center text-sm text-[--gray]">
            แสดง {result.length} จากทั้งหมด {result.length}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationFirst
                  isActive={page === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  isActive={page === 1 ? false : true}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm">{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  isActive={
                    page === totalPage ? false : true
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLast
                  isActive={
                    page === totalPage ? false : true
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

export default ServicesCategoriesPage;
