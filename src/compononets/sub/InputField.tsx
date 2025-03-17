import InputFieldProps from "../../types/InputFiledTypes";

export default function InputField(props: InputFieldProps) {
    return (
        <div className="relative">
            <label htmlFor={props.id} className="sr-only">
                {props.placeholder}
            </label>
            <input
                id={props.id}
                type={props.type}
                onChange={props.onChange}
                className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={props.placeholder}
                required
            />
            {/* <FontAwesomeIcon
                icon={icon}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            /> */}
        </div>
    );
}
