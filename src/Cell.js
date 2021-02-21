export function Cell(props) {
  return <td onClick={props.handleClick} className='cell'>{props.val}</td>;
}