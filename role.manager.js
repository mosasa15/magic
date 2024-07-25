var roleManager = {  
    /**  
     * @param {Creep} creep - The creep to run logic for.  
     */  
    run: function(creep) {  
        
        // 查找最近的storage  
        if (creep.store[RESOURCE_ENERGY] === 0) {  
            // 查找具有足够能量的 Storage  
            var storage = creep.room.storage;
            if (storage) {  
                // 尝试从 Storage 中提取能量  
                if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                    // 如果不在范围内，则移动到 Storage  
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});  
                }  
            } 
        }
        else {  
            var targets = creep.room.find(FIND_STRUCTURES, {  
                filter: (structure) => {  
                    return (structure.structureType === STRUCTURE_EXTENSION ||  
                            structure.structureType === STRUCTURE_TOWER ||  
                            structure.structureType === STRUCTURE_SPAWN) &&  
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;  
                }  
            });  
            targets.sort((a, b) => {  
                // 优先检查是否为塔且能量低于60%  
                if (a.structureType === STRUCTURE_TOWER && a.store.getUsedCapacity(RESOURCE_ENERGY) / a.store.getCapacity(RESOURCE_ENERGY) < 0.6) {  
                    return -1;  
                }  
                if (b.structureType === STRUCTURE_TOWER && b.store.getUsedCapacity(RESOURCE_ENERGY) / b.store.getCapacity(RESOURCE_ENERGY) < 0.6) {  
                    return 1;  
                }  
                // 如果两个都不是低能量的塔，则比较类型  
                if (a.structureType === STRUCTURE_TOWER) return -1;  
                if (b.structureType === STRUCTURE_TOWER) return 1;  
                // 接下来比较扩展和孵化场  
                if (a.structureType === STRUCTURE_EXTENSION) return -1;  
                if (b.structureType === STRUCTURE_EXTENSION) return 1;  
                // 最后是孵化场  
                if (a.structureType === STRUCTURE_SPAWN) return -1;  
                if (b.structureType === STRUCTURE_SPAWN) return 1;  
                // 如果所有条件都不满足，则它们相等  
                return 0;  
            });  
            if (targets.length > 0) {  
                if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});  
                }  
            }  
        }
    }  
};  

module.exports = roleManager;