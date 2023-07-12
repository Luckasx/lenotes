import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../../src/views/Home";

import axiosInstance from "../config/axios.config";

jest.mock("../config/axios.config");

const mockedResponseMessage = {
  status: 200,
  data: {
    express: "Hello From Express",
  },
};

const mockedErrorHello = {
  status: 500,
  data: {
    message: "Error From Express",
  },
};

const mockedResponseNotes = {
  status: 200,
  data: [],
};

axiosInstance.get.mockImplementation((url) => {
  if (url === "/api/mensagem") {
    return Promise.resolve(mockedResponseMessage);
  }

  if (url === "/api/notes") {
    return Promise.resolve(mockedResponseNotes);
  }

  // Handle other API calls if needed

  // If the URL doesn't match any mocked API call, you can throw an error or handle it as desired
  throw new Error(`Unhandled API call: ${url}`);
});

const renderHome = async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(() => {
    render(<Home />);
  });
};

describe("testing Home view", () => {
  test("renders LE NOTES title", async () => {
    await renderHome();

    expect(screen.getByText("LE NOTES")).toBeInTheDocument();

    const specificDiv = screen.getByTestId("home_container");
    expect(specificDiv).toBeInTheDocument();
  });

  test("renders Hello from Ajax Request", async () => {
    await renderHome();

    expect(screen.getByText("Hello From Express")).toBeInTheDocument();
  });

  test("feedback no notes", async () => {
    await renderHome();

    expect(screen.getByText("Wow, such empty. =(")).toBeInTheDocument();
  });

  test("error API hello", async () => {
    await axiosInstance.get.mockImplementation((url) => {
      if (url === "/api/mensagem") {
        return Promise.resolve(mockedErrorHello);
      }

      if (url === "/api/notes") {
        return Promise.resolve(mockedResponseNotes);
      }

      // Handle other API calls if needed

      // If the URL doesn't match any mocked API call, you can throw an error or handle it as desired
      throw new Error(`Unhandled API call: ${url}`);
    });

    
    await renderHome()

    expect(screen.getByText("error..")).toBeInTheDocument();
  });
});
