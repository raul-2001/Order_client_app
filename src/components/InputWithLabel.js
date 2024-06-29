import React from "react";

const InputWithLabel = () => {
    // const inputRef = React.inputRef(null);
    // React.useEffect(() => {
    //     inputRef.current.focus();
    // })

    return(
        <div>
            <label data-testid="labelid" className="#" htmlFor="username">username</label>
            <input>
                id="username"
                type="text"
                name="username"
                {/* value="" */}
                {/* ref={inputRef} */}
                className="#"
            </input>
        </div>
    )
}

export default InputWithLabel