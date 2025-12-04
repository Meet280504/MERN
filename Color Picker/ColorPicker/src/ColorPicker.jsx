

export default function ColorPicker({ setbgColor, setTextColor }) {

    return (


        <div className="flex items-center justify-center gap-10 max-w-7xl mx-auto w-full">
            <div className=" px-5 w-full flex flex-col justify-center gap-3  ">
                <label htmlFor="" className='text-xl font-semibold'>Pick Background Color</label>
                <input type="color" className="w-full h-30 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer "
                    onChange={(e) => setbgColor(e.target.value)}
                />
            </div>
            <div className=" px-5 w-full flex flex-col justify-center gap-3  ">
                <label htmlFor="" className='text-xl font-semibold'>Pick Text Color</label>
                <input type="color" className="w-full h-30 hover:scale-105 hover:shadow-xl transition duration-300 cursor-pointer "
                    onChange={(e) => setTextColor(e.target.value)}
                />
            </div>
        </div>

    );
}
