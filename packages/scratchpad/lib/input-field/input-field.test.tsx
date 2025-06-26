import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { InputField } from "./input-field";
import {
  inputFieldProperties1,
  inputFieldProperties2,
} from "./input-field.mocks";

describe("InputField", () => {
  test("renders InputField elements", () => {
    render(<InputField {...inputFieldProperties1} />);
    expect(screen.getByTestId(inputFieldProperties1.id)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(inputFieldProperties1.value)
    ).toBeInTheDocument();
  });

  describe("type='text'", () => {
    const InputTextTester = ({ initialValue }: { initialValue: string }) => {
      const [value, setValue] = useState(initialValue);
      return (
        <InputField
          id="input-text-tester"
          onChange={(newValue: number | string) => {
            setValue(newValue as string);
          }}
          type="text"
          value={value}
        />
      );
    };

    describe("empty starting value", () => {
      test("type string", async () => {
        const user = userEvent.setup();
        render(<InputTextTester initialValue="" />);

        await user.type(screen.getByTestId("input-text-tester"), "value");
        expect(screen.getByTestId("input-text-tester")).toHaveValue("value");
      });

      test("type number", async () => {
        const user = userEvent.setup();
        render(<InputTextTester initialValue="" />);

        await user.type(screen.getByTestId("input-text-tester"), "123");
        expect(screen.getByTestId("input-text-tester")).toHaveValue("123");
      });

      test("type float", async () => {
        const user = userEvent.setup();
        render(<InputTextTester initialValue="" />);

        await user.type(screen.getByTestId("input-text-tester"), "3.14");
        expect(screen.getByTestId("input-text-tester")).toHaveValue("3.14");
      });
    });

    describe("with starting value", () => {
      test("type string", async () => {
        const user = userEvent.setup();
        render(<InputTextTester initialValue="test" />);

        await user.type(screen.getByTestId("input-text-tester"), "value");
        expect(screen.getByTestId("input-text-tester")).toHaveValue(
          "testvalue"
        );
      });

      test("type number", async () => {
        const user = userEvent.setup();
        render(<InputTextTester initialValue="test" />);

        await user.type(screen.getByTestId("input-text-tester"), "123");
        expect(screen.getByTestId("input-text-tester")).toHaveValue("test123");
      });

      test("type special character", async () => {
        const user = userEvent.setup();
        render(<InputTextTester initialValue="test" />);

        await user.type(screen.getByTestId("input-text-tester"), "!`'$%&");
        expect(screen.getByTestId("input-text-tester")).toHaveValue(
          "test!`'$%&"
        );
      });
    });
  });

  describe("type='number'", () => {
    const InputNumberTester = ({ initialValue }: { initialValue: number }) => {
      const [value, setValue] = useState(initialValue);
      const double = value * 2;
      return (
        <>
          <InputField
            id="input-number-tester"
            onChange={(newValue: number | string) => {
              setValue(newValue as number);
            }}
            type="number"
            value={value}
          />
          <div data-testid="doubled">{double}</div>
        </>
      );
    };

    test("callbacks number value and filters string", async () => {
      const onChangeMock = vi.fn();
      const properties: typeof inputFieldProperties2 = {
        ...inputFieldProperties2,
        onChange: onChangeMock,
        value: 0,
      };
      const user = userEvent.setup();
      render(<InputField {...properties} />);

      await user.type(screen.getByTestId(properties.id), "1");
      expect(onChangeMock).toHaveBeenLastCalledWith(1);
      await user.type(screen.getByTestId(properties.id), "a");
      expect(onChangeMock).toHaveBeenLastCalledWith(1);
    });

    test("type string", async () => {
      const user = userEvent.setup();
      render(<InputNumberTester initialValue={0} />);

      await user.type(screen.getByTestId("input-number-tester"), "value");
      expect(screen.getByTestId("input-number-tester")).toBeNull();
      expect(screen.getByTestId("doubled")).toHaveTextContent("0");
    });

    test("type number", async () => {
      const user = userEvent.setup();
      render(<InputNumberTester initialValue={0} />);

      await user.type(screen.getByTestId("input-number-tester"), "123");
      expect(screen.getByTestId("input-number-tester")).toHaveValue(123);
      expect(screen.getByTestId("doubled")).toHaveTextContent("246");
    });

    test("type float", async () => {
      const user = userEvent.setup();
      render(<InputNumberTester initialValue={0} />);

      await user.type(screen.getByTestId("input-number-tester"), "3.14");
      expect(screen.getByTestId("input-number-tester")).toHaveValue(3.14);
      expect(screen.getByTestId("doubled")).toHaveTextContent("6.28");
    });

    test("type incomplete float", async () => {
      const user = userEvent.setup();
      render(<InputNumberTester initialValue={0} />);

      await user.type(screen.getByTestId("input-number-tester"), "3.");
      expect(screen.getByTestId("input-number-tester")).toHaveValue(3);
      expect(screen.getByTestId("doubled")).toHaveTextContent("6");
    });
  });
});
