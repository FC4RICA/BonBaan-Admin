import { z } from "zod";
import { MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "./constants";

const packageSchema = z.object({
  name: z.string().nonempty({ message: "กรุณากำหนดชื่อแพ็กเกจ" }),
  price: z.coerce
    .number()
    .positive({ message: "ราคาต้องเป็นจำนวนเต็มบวก" })
    .int({ message: "ราคาต้องเป็นจำนวนเต็มบวก" }),
  order_type_id: z.string().nonempty({ message: "กรุณาเลือกประเภทของแพ็กเกจ" }),
  description: z.string().nonempty({ message: "กรุณากำหนดรายละเอียดแพ็กเกจ" }),
  item: z.string().nonempty({ message: "กรุณากำหนดสินค้าในแพ็กเกจ" })
});

const imageSchema = z.union([
  z.string().url({ message: "รูปภาพต้องเป็น URL ที่ถูกต้อง" }), // Existing images (URLs)
  z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "รองรับเฉพาะไฟล์ JPG, PNG, และ WEBP เท่านั้น",
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: `ขนาดไฟล์ต้องไม่เกิน ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`,
    }),
]);

const serviceSchema = z.object({
  name: z.string().nonempty({
    message: "กรุณากำหนดชื่อของบริการ",
  }),
  description: z.string().nonempty({
    message: "กรุณากำหนดคำอธิบายของบริการ",
  }),
  address: z.string().nonempty({
    message: "กรุณากำหนดสถานที่ของบริการ",
  }),
  packages: z
    .array(packageSchema)
    .min(1, { message: "ต้องมีอย่างน้อย 1 แพ็กเกจ" }),
  custom_package: z.boolean(),
  attachments: z
    .array(imageSchema)
    .nonempty({ message: "กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูป" }),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "เลือกอย่างน้อย 1 หมวดหมู่",
    }),
});

export { serviceSchema, packageSchema, imageSchema };
