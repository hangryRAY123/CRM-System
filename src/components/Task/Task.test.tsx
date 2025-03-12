import { render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";

describe("Task component", () => {

    test('Task render', () => {
        render(<TaskList />); 
        expect(screen.queryByRole('list')).toBeInTheDocument();
    })
});
