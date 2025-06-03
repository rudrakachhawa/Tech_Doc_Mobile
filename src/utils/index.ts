export const transformToNestedStructure = (items: any[], data: any) => {
    // First, let's create a map of items for faster lookup
    const itemsMap = new Map(items.map(item => [item.id, item]));
  
    const buildTree = (parentId: string): any[] => {
      // Get children from the steps object
      const childrenIds = data.steps[parentId] || [];
      
      return childrenIds.map(childId => {
        // Find the item in our map
        const item = itemsMap.get(childId);
        if (!item) return null;
  
        return {
          id: item.id,
          name: item.name,
          children: buildTree(childId)
        };
      }).filter(Boolean);
    };
  
    // Get the root items from the collectionJson
    const rootItems = Object.values(data.collectionJson || {});
    
    return rootItems.map(rootItem => {
      return {
        id: rootItem.id,
        name: rootItem.name,
        children: buildTree(rootItem.id)
      };
    });
  };