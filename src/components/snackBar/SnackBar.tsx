import { FaCheck } from "react-icons/fa6";
import {useEffect} from "react";
import "./SnackBar.css";
interface IProps {
  title: string;
  onClose: () => void;
}
function SnackBar(props: IProps) {
    useEffect(()=>{
        setTimeout(props.onClose, 3000);
    })
  return (
    <>
      <div className="snackBar">
        <FaCheck /> <em>{props.title} <button className="btn" onClick={props.onClose}> Close </button></em>

      </div>
    </>
  );
}

export default SnackBar;
