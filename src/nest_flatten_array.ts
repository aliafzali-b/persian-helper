//define types
type flat_node = { id: number; parent_id: number | null; title: string };
type nest_node = { id: number; childs: nest_node[]; title: string };
type flat_option = { label: string; value: string };
type nest_option = {
  label: string;
  value?: string;
  options?: nest_option[];
  depth: number;
};
//end types
export function nest_flaten_array(original_array: flat_node[]) {
  let highest = original_array.filter((item) => item.parent_id == null);
  let result_array: nest_node[] = [];
  while (highest.length > 0) {
    let pop_item = highest.pop();
    if (pop_item) result_array.push(find_childs(pop_item, original_array));
  }
  return result_array;
}
function find_childs(node: flat_node, original_array: flat_node[]) {
  let newNode: nest_node = { id: node.id, childs: [], title: node.title };
  let direct_childs: flat_node[] = original_array.filter(
    (item) => item.parent_id == node.id
  );
  while (direct_childs.length > 0) {
    let pop_item = direct_childs.pop();
    if (pop_item) {
      newNode.childs.push(find_childs(pop_item, original_array));
    }
  }
  return newNode;
}
export function flat_to_options(flat_items: flat_node[]) {
  if (!flat_items) return [];
  let depth = 0;
  let highest = flat_items.filter((item) => item.parent_id == null);
  let result_array: nest_option[] = [];
  while (highest.length > 0) {
    let pop_item = highest.pop();
    if (pop_item) {
      let direct_childs: flat_node[] = flat_items.filter(
        (item) => item.parent_id == pop_item?.id
      );
      if (direct_childs) {
        if (direct_childs.length > 0)
          result_array.push({
            value: pop_item.id.toString(),
            depth: 1,
            label: pop_item.title,
          });
      }
      result_array.push(find_options(pop_item, flat_items, depth + 1));
    }
  }
  return result_array;
}
function find_options(node: flat_node, flat_items: flat_node[], depth: number) {
  let direct_childs: flat_node[] = flat_items.filter(
    (item) => item.parent_id == node.id
  );
  let newNode: nest_option = { label: node.title, depth: depth };
  if (direct_childs.length > 0) {
    newNode.options = [];
  } else newNode.value = node.id.toString();
  while (direct_childs.length > 0) {
    let pop_item = direct_childs.pop();
    if (pop_item && newNode.options) {
      newNode.options.push(find_options(pop_item, flat_items, depth + 1));
    }
  }
  return newNode;
}
