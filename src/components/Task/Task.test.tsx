import { render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";

describe("Task component", () => {

    test('Task render', () => {
        render(<TaskList tasks={[]} changeTask={function (): void {
            throw new Error("Function not implemented.");
        } } />); 
        expect(screen.queryByRole('list')).toBeInTheDocument();
    })
});
