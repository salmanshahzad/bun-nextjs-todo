import classNames from "classnames";
import type { ComponentPropsWithRef } from "react";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {}

export function Button(props: ButtonProps) {
    const { className, children, ref, ...rest } = props;

    return (
        <button
            className={classNames("btn", className)}
            ref={ref}
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
}
