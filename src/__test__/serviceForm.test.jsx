import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { CreateServiceForm } from "../components/forms/serviceForm";
import { any, string } from "zod";

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => "mock-url");
});

describe("CreateServiceForm - Render", () => {
  it("render the form field correctly", () => {
    render(<CreateServiceForm />);
    expect(screen.getByPlaceholderText("ชื่อบริการ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("รายละเอียดบริการ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ชื่อแพ็กเกจ")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ราคา")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("รายละเอียดแพ็กเกจ")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("สถานที่บริการ")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "อนุญาตคำสั่งซื้อพิเศษ" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "เพิ่มแพ็กเกจใหม่" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "เพิ่มบริการใหม่" })
    ).toBeInTheDocument();
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).greaterThanOrEqual(2);
    expect(screen.getByTestId("service-images")).toBeInTheDocument();
    expect(screen.getByText("ประเภท")).toBeInTheDocument();
    expect(screen.getAllByRole("radio").length).equal(2);
  });

  it("submits correctly when valid values are provided", async () => {
    const onSubmit = vi.fn();

    render(<CreateServiceForm onSubmit={onSubmit} />);

    const nameInput = screen.getByPlaceholderText("ชื่อบริการ");
    const descriptionInput = screen.getByPlaceholderText("รายละเอียดบริการ");
    const packageNameInput = screen.getByLabelText("ชื่อแพ็กเกจ");
    const packagePriceInput = screen.getByLabelText("ราคา");
    const packageDescriptionInput = screen.getByLabelText("รายการสินค้า");
    const locationInput = screen.getByPlaceholderText("สถานที่บริการ");
    const customInput = screen.getByRole("checkbox", {
      name: "อนุญาตคำสั่งซื้อพิเศษ",
    });
    const imageInput = screen.getByTestId("service-images");
    const categoryInput = screen.getByLabelText("ความรัก");

    // Simulate user input
    await userEvent.type(nameInput, "New Service");
    await userEvent.type(descriptionInput, "This is a valid description.");
    await userEvent.type(packageNameInput, "Package name");
    await userEvent.type(packagePriceInput, "100");
    await userEvent.type(
      packageDescriptionInput,
      "This is a valid description."
    );
    await userEvent.type(locationInput, "This is a valid location.");
    await userEvent.click(customInput);

    const image = new File(["content"], "image.jpg", {
      type: "image/jpeg",
      size: 2 * 1024 * 1024,
    });
    await userEvent.upload(imageInput, image);
    expect(await screen.getByAltText(/uploaded-0/i)).toBeInTheDocument();

    await userEvent.click(categoryInput);

    const submitButton = screen.getByRole("button", {
      name: "เพิ่มบริการใหม่",
    });
    await userEvent.click(submitButton);

    expect(
      await screen.queryByText("กรุณากำหนดชื่อของบริการ")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByText("กรุณากำหนดคำอธิบายของบริการ")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByText("กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูป")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByText("เลือกอย่างน้อย 1 หมวดหมู่")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByText("กรุณากำหนดชื่อแพ็กเกจ")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByText("ราคาต้องเป็นจำนวนเต็มบวก")
    ).not.toBeInTheDocument();
    expect(
      await screen.queryByText("กรุณากำหนดคำอธิบายแพ็กเกจ")
    ).not.toBeInTheDocument();

    await expect(onSubmit).toHaveBeenCalledTimes(1);

    await expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Service",
        description: "This is a valid description.",
        location: "This is a valid location.",
        packages: [
          {
            name: "Package name",
            price: 100,
            description: "This is a valid description.",
            type: expect.any(String)
          },
        ],
        customable: true,
        images: [image],
        categories: ["1"],
      })
    );
  });
});

describe("CreateServiceForm - Validation", () => {
  it("shows error messages when submitted with empty fields", async () => {
    render(<CreateServiceForm />);

    const submitButton = screen.getByRole("button", {
      name: "เพิ่มบริการใหม่",
    });
    await userEvent.click(submitButton);

    expect(
      await screen.getByText("กรุณากำหนดชื่อของบริการ")
    ).toBeInTheDocument();
    expect(
      await screen.getByText("กรุณากำหนดคำอธิบายของบริการ")
    ).toBeInTheDocument();
    expect(
      await screen.getByText("กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูป")
    ).toBeInTheDocument();
    expect(
      await screen.getByText("เลือกอย่างน้อย 1 หมวดหมู่")
    ).toBeInTheDocument();
    expect(await screen.getByText("กรุณากำหนดชื่อแพ็กเกจ")).toBeInTheDocument();
    expect(
      await screen.getByText("ราคาต้องเป็นจำนวนเต็มบวก")
    ).toBeInTheDocument();
    expect(
      await screen.getByText("กรุณากำหนดคำอธิบายแพ็กเกจ")
    ).toBeInTheDocument();
  });

  it("show error messages when submitted with non positive integer value", async () => {
    render(<CreateServiceForm />);

    const priceInput = screen.getByPlaceholderText("ราคา");
    const submitButton = screen.getByRole("button", {
      name: "เพิ่มบริการใหม่",
    });

    await userEvent.type(priceInput, "-1");
    await userEvent.click(submitButton);
    expect(
      await screen.getByText("ราคาต้องเป็นจำนวนเต็มบวก")
    ).toBeInTheDocument();

    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "1.123");
    expect(
      await screen.getByText("ราคาต้องเป็นจำนวนเต็มบวก")
    ).toBeInTheDocument();

    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "0");
    expect(
      await screen.getByText("ราคาต้องเป็นจำนวนเต็มบวก")
    ).toBeInTheDocument();

    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, "123");
    expect(
      await screen.queryByText("ราคาต้องเป็นจำนวนเต็มบวก")
    ).not.toBeInTheDocument();
  });
});

describe("CreateServiceForm - Image Validation", () => {
  it("allows multiple uploads of a valid image file", async () => {
    render(<CreateServiceForm />);

    const fileInput = screen.getByTestId("service-images");
    const file1 = new File(["content1"], "image1.jpg", { type: "image/jpeg" });
    const file2 = new File(["content2"], "image2.png", { type: "image/png" });
    await userEvent.upload(fileInput, [file1, file2]);

    expect(await screen.getByAltText(/uploaded-0/i)).toBeInTheDocument();
    expect(await screen.getByAltText(/uploaded-1/i)).toBeInTheDocument();
  });

  it("removes an uploaded image when clicking delete", async () => {
    render(<CreateServiceForm />);

    const fileInput = screen.getByTestId("service-images");
    const file = new File(["content"], "image.jpg", { type: "image/jpeg" });

    await userEvent.upload(fileInput, file);

    const removeButton = await screen.getByLabelText(/delete-image/i);
    await userEvent.click(removeButton);

    expect(await screen.queryByAltText(/uploaded-0/i)).not.toBeInTheDocument();
  });

  // it("shows an error when uploading an invalid file type", async () => {
  //   render(<CreateServiceForm />);

  //   const fileInput = screen.getByTestId("service-images");
  //   const invalidFile = new File(["dummy content"], "test-document.pdf", { type: "application/pdf" });
  //   await userEvent.upload(fileInput, invalidFile);

  //   expect(await screen.getByText(/รองรับเฉพาะไฟล์ JPG, PNG, และ WEBP เท่านั้น/i)).toBeInTheDocument();
  // });
});

describe("CreateServiceForm - Packages Validation", () => {
  it("packages adding and removing working correctly", async () => {
    render(<CreateServiceForm />);

    const addPackageButton = screen.getByRole("button", {
      name: "เพิ่มแพ็กเกจใหม่",
    });

    await userEvent.click(addPackageButton);

    expect(await screen.getAllByLabelText("ชื่อแพ็กเกจ").length).equal(2);
    expect(await screen.getAllByLabelText("ราคา").length).equal(2);
    expect(await screen.getAllByLabelText("รายการสินค้า").length).equal(2);

    const removePackageButton = await screen.getAllByLabelText(
      /delete-package/i
    )[0];
    await userEvent.click(removePackageButton);

    expect(await screen.getAllByLabelText("ชื่อแพ็กเกจ").length).equal(1);
    expect(await screen.getAllByLabelText("ราคา").length).equal(1);
    expect(await screen.getAllByLabelText("รายการสินค้า").length).equal(1);
  });
});
