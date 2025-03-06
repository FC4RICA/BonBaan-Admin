import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "../../schemas/serviceSchema";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CollapsibleInput from "../shared/CollapsibleInput";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const defaultServiceValues = {
  name: "",
  description: "",
  address: "",
  packages: [{ name: "", price: "", type: "1", description: "" }],
  customable: false,
  images: [],
  categories: [],
};

const CreateServiceForm = ({
  defaultValues = defaultServiceValues,
  submitButtonLabel = "เพิ่มบริการใหม่", // Default for create
  onSubmit,
  categories = [],
  types = [],
}) => {
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: defaultValues,
  });

  const fileRef = form.register("file");
  const [existingImages, setExistingImages] = useState(
    defaultValues.images || []
  );
  const [uploadedImages, setUploadedImages] = useState([]);
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const previews = files.map((file) => ({
        url: URL.createObjectURL(file),
        file: file,
      }));

      const newImages = [...uploadedImages, ...previews];
      setUploadedImages(newImages);
      form.setValue(
        "images",
        [...existingImages, ...newImages.map((img) => img.file)],
        { shouldValidate: true }
      );
    }
  };

  const removeImage = (index, type) => {
    let newImages;

    if (type === "existing") {
      newImages = existingImages.filter((_, i) => i !== index);
      setExistingImages(newImages);
    } else {
      newImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(newImages);
    }

    // Update form state to match removed images
    form.setValue("images", [...newImages.map((img) => img.file)], {
      shouldValidate: true,
    });
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "packages",
  });

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("existingImages", JSON.stringify(existingImages));

    uploadedImages.forEach(({ file }) => {
      formData.append("images", file);
    });

    Object.keys(values).forEach((key) => {
      if (key !== "images") {
        if (key === "packages" || key === "categories") {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      }
    });

    if (onSubmit) {
      onSubmit(values);
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex gap-4">
          <div className="flex flex-col w-full gap-4 ">
            {/* Service Title */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="ชื่อบริการ" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Description */}
            <CollapsibleInput header="รายละเอียด">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea placeholder="รายละเอียดบริการ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CollapsibleInput>

            {/* Service Packages */}
            <CollapsibleInput header="แพ็กเกจ">
              <div className="space-y-4">
                {fields.map((item, index) => (
                  <PackageForm
                    types={types}
                    index={index}
                    form={form}
                    remove={remove}
                    fields={fields}
                    key={item.id}
                  />
                ))}
                <div className="flex gap-4 items-end">
                  {/* Add New Package Button */}
                  <Button
                    type="button"
                    onClick={() =>
                      append({ name: "", price: "", description: "" })
                    }
                  >
                    <Plus />
                    เพิ่มแพ็กเกจใหม่
                  </Button>

                  <p className="text-sm text-[--gray]">
                    ทั้งหมด {fields.length} แพ็กเกจ
                  </p>
                </div>
              </div>
            </CollapsibleInput>

            {/* Settings */}
            <CollapsibleInput header="ตั้งค่าเพิ่มเติม">
              <FormField
                control={form.control}
                name="customable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>อนุญาตคำสั่งซื้อพิเศษ</FormLabel>
                  </FormItem>
                )}
              />
            </CollapsibleInput>
          </div>
          <div className="flex flex-col min-w-64 w-1/3 gap-4">
            {/* Submit Button */}
            <Button type="submit" className="btn-block">
              {submitButtonLabel}
            </Button>

            {/* Service Images */}
            <CollapsibleInput header="ภาพบริการ">
              {/* Existed Images Preview */}
              {existingImages.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {existingImages.map((src, index) => (
                    <div
                      key={index}
                      className="relative [&>button]:hover:inline-flex"
                    >
                      <img
                        src={src}
                        alt={`existing-${index}`}
                        className="w-full h-24 object-cover rounded-md border border-[--border]"
                      />
                      <Button
                        type="button"
                        variant="icon"
                        size="xs"
                        className="absolute top-1 right-1 hidden rounded-full"
                        onClick={() => removeImage(index, "existing")}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              {/* Images Input */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="file"
                        {...fileRef}
                        variant="file"
                        multiple
                        onChange={handleImageChange}
                        data-testid="service-images"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {uploadedImages.map(({ url }, index) => (
                    <div
                      key={index}
                      className="relative [&>button]:hover:inline-flex"
                    >
                      <img
                        src={url}
                        alt={`uploaded-${index}`}
                        className="w-full h-24 object-cover rounded-md border border-gray-300"
                      />
                      <Button
                        aria-label="delete-image"
                        type="button"
                        variant="icon"
                        size="xs"
                        className="absolute top-1 right-1 hidden rounded-full"
                        onClick={() => removeImage(index, "uploaded")}
                      >
                        <X />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleInput>

            {/* Service Categories */}
            <CollapsibleInput header="หมวดหมู่">
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    {categories.map((category) => (
                      <FormField
                        key={category.ID}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={category.ID}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(category.ID)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          category.ID,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== category.ID
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel>{category.name}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CollapsibleInput>

            {/* Service Address */}
            <CollapsibleInput header="สถานที่">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Textarea placeholder="สถานที่บริการ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CollapsibleInput>
          </div>
        </div>
      </form>
    </Form>
  );
};

const PackageForm = ({ index, form, remove, fields, types }) => {
  return (
    <>
      <div className="flex flex-col items-stretch gap-4 border border-[--border] bg-neutral-50 p-3 rounded-md">
        <div className="flex gap-4">
          {/* Package Name */}
          <FormField
            control={form.control}
            name={`packages.${index}.name`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>ชื่อแพ็กเกจ</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อแพ็กเกจ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Package Price */}
          <FormField
            control={form.control}
            name={`packages.${index}.price`}
            render={({ field }) => (
              <FormItem className="max-w-60">
                <FormLabel>ราคา</FormLabel>
                <FormControl>
                  <Input placeholder="ราคา" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`packages.${index}.type`}
            render={({ field }) => (
              <FormItem className="min-w-24">
                <FormLabel>ประเภท</FormLabel>
                <FormControl>
                  {types.length > 0 ? (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={types[0].ID}
                      className="flex flex-col gap-1.5"
                    >
                      {types.map((item) => (
                        <FormItem
                          key={item.ID}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={item.ID} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  ) : null}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remove Button */}
          {fields.length > 1 && (
            <Button
              aria-label="delete-package"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              className="mt-8"
            >
              <Trash />
            </Button>
          )}
        </div>

        {/* Package Description */}
        <FormField
          control={form.control}
          name={`packages.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>รายการสินค้า</FormLabel>
              <FormControl>
                <Textarea placeholder="รายละเอียดแพ็กเกจ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export { CreateServiceForm };
