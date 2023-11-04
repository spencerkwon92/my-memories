import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppLayout from "../components/layout/AppLayout";
import {Provider} from 'react-redux'
import {configureStore} from '../store/configureStore'
import "@testing-library/jest-dom";


const store = configureStore();
const MockAppLayout = () => {
  return (
    <Provider store={store}>
      <AppLayout>
        <div>test content</div>
      </AppLayout>
    </Provider>
  );
}

describe("AppLayout Component Test", () => {

  it("renders children", () => {
    render(
      <MockAppLayout/>
    );
    expect(screen.getByText('My Memories')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText("test content")).toBeInTheDocument();
  });
});

describe('AppLayout Component Test in mobile size screen.', ()=>{
  // set the mobile version App.
  let useRouterMock;
  beforeAll(()=>{
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    })
    useRouterMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    });
    require('next/router').useRouter = useRouterMock;
  })

  it("renders AppLayout component for mobile view", () => {

    render(
      <MockAppLayout/>
    )
    //Header check.
    expect(screen.getByText("My Memories")).toBeInTheDocument();
    expect(screen.queryByText("Search")).not.toBeInTheDocument(); // Search should not be visible on mobile
    //footer check.
    expect(screen.queryByLabelText("Home Button")).toBeInTheDocument();
    expect(screen.queryByLabelText("Search Button")).toBeInTheDocument();
    expect(screen.queryByLabelText("Profile Button")).toBeInTheDocument(); // Home button should be visible on mobile
  });

  it("Footer home button function test.", () => {
    render(
      <MockAppLayout/>
    )

    const homeButton = screen.getByTestId("home-button");
    fireEvent.click(homeButton);
    expect(useRouterMock().push).toHaveBeenCalledWith("/");
  });
})
