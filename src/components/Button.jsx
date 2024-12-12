const Button = ({label, iconURL}) => {
  return (
    <button className="flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none bg-primary-kalia text-white border-primary-kalia rounded-full">
        {label}
    </button>
  )
}

export default Button