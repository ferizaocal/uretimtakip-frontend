interface SelectionListProps {
  isModalOpen?: boolean;
  goBack?: () => void;
  selectedItem?: any;
  setSelectedItem?: (item: any) => void;
}
export default SelectionListProps;
