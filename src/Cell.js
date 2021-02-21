export function Cell(props) {
  return <span onClick={props.handleClick} className='cell'>{props.val}</span>;
}