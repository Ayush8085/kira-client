import { useState } from "react"

export const DropArea = ({ onDrop }) => {
    const [showDrop, setShowDrop] = useState(false);

    return (
        <section
            className={showDrop ? "drop_area" : "hide_drop"}
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDrop={() => {
                onDrop();
                setShowDrop(false);
            }}
            onDragOver={(e) => e.preventDefault()}
        >
            Drop Here
        </section>
    )
}
