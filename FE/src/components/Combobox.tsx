import { useCombobox } from "downshift";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { styled } from "styled-components";
const SelectPlace = styled.div`
  width: fit-content;
  z-index: 10px;
`;

const SelectText = styled.input`
  border: solid 1px black;
  border-radius: 10px;
  font-family: NanumSquareNeoBold;
  font-size: 20px;
  padding: 10px;
`;
const SelectButton = styled.button`
  position: relative;
  top: 10px;
  right: 40px;
`;
const Dropdown = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding-left: 0px;
  position: absolute;
  display: block;
  width: 290px;
  border: ${props => props.$isOpen && "1px solid black"};
  z-index: 1;
  box-shadow: ${props => props.$isOpen && "3px 3px 3px 3px rgba(0,0,0, 0.24)"};
  border-radius: 10px;
`;
const DropdownItem = styled.li`
  font-family: NanumSquareNeoRegular;
  text-align: end;
  padding: 4px;
  &:first-child {
    border-radius: 10px 10px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
`;
function Combobox({ placeholder, items }: { placeholder: string; items: string[] }) {
  const {
    isOpen,
    highlightedIndex,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useCombobox({
    items,
  });

  return (
    <>
      <SelectPlace>
        <SelectText readOnly placeholder={placeholder} {...getInputProps()} />
        <SelectButton {...getToggleButtonProps()}>
          {isOpen ? <MdKeyboardArrowUp size={30} /> : <MdKeyboardArrowDown size={30} />}
        </SelectButton>
        <Dropdown {...getMenuProps()} $isOpen={isOpen}>
          {isOpen &&
            items.map((item, index) => (
              <DropdownItem
                {...getItemProps({ item, index })}
                key={item}
                style={{ background: index === highlightedIndex ? "lightgray" : "white" }}
              >
                {item}
              </DropdownItem>
            ))}
        </Dropdown>
      </SelectPlace>
    </>
  );
}

export default Combobox;
