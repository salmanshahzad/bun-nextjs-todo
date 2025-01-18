import classNames from "classnames";
import type { ComponentPropsWithRef } from "react";

export interface TextInputProps extends ComponentPropsWithRef<"input"> {
    error?: string | undefined;
    label?: string | undefined;
}

export function TextInput(props: TextInputProps) {
    const { className, error, label, ref, ...rest } = props;

    return (
        <label className="form-control w-full">
            {label && (
                <div className="label">
                    <span className="label-text">{label}</span>
                </div>
            )}
            <input
                className={classNames(
                    "input",
                    "input-bordered",
                    { "input-error": !!error },
                    className,
                )}
                ref={ref}
                {...rest}
            />
            {error && (
                <div className="label">
                    <span className="label-text-alt text-red-400">{error}</span>
                </div>
            )}
        </label>
    );
}
