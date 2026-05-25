import { expect, test } from "@playwright/test";

const mockUsers = [
  { id: 1, name: "Zhang" },
  { id: 2, name: "Xu" },
];

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:8888/users", async (route) => {
    await route.fulfill({
      json: mockUsers,
    });
  });

  await page.goto("/");
});

test("should display the welcome message", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: /Welcome to use react-template-next/i }),
  ).toBeVisible();
});

test("should increment counter when clicking ADD button", async ({ page }) => {
  const heading = page.getByRole("heading", {
    name: /Welcome to use react-template-next/i,
  });

  const initialText = await heading.textContent();
  const initialCount = Number(initialText?.match(/x(\d+)/)?.[1] ?? "0");

  await page.getByRole("button", { name: "ADD conut" }).click();

  await expect(heading).toContainText(`x${initialCount + 1}`);
});

test("should display user cards after API response", async ({ page }) => {
  await expect(page.locator(".MuiSkeleton-root")).toHaveCount(0);
  await expect(page.getByText("Zhang")).toBeVisible();
  await expect(page.getByText("Xu")).toBeVisible();
});

test("should open a dialog when clicking on a user card", async ({ page }) => {
  await page.getByRole("button", { name: "More" }).first().click();

  const dialog = page.getByRole("dialog");

  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("ID: 1")).toBeVisible();
  await expect(dialog.getByText("Name: Zhang")).toBeVisible();
});
