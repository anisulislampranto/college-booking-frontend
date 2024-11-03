export const InputField = ({ label, id, type = "text", validation, register, errors }) => (
    <>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div style={{margin: 0}}>
        <input
          id={id}
          type={type}
          {...register(id, validation)}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            errors[id] ? "ring-red-500" : ""
          }`}
        />
        {errors[id] && (
          <p className="text-sm text-red-600 mt-1">{errors[id].message}</p>
        )}
      </div>
    </>
  );