var roleUpgrader = {  
    /** @param {Creep} creep **/  
    run: function(creep) {  
        const targetRoomName = creep.memory.targetRoomName;  
        const upgradeLink = Game.getObjectById(Memory.rooms.E54N19.upgradeLinkId);  
        const storage = creep.room.storage;  
        // 状态切换逻辑  
        this.toggleState(creep);  
        // 执行动作  
        if (creep.memory.upgrading) {  
            this.upgradeController(creep);  
        } else {  
            this.harvestEnergy(creep, targetRoomName, upgradeLink, storage);  
        }  
    },  
    toggleState: function(creep) {  
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {  
            creep.memory.upgrading = false;  
            creep.say('🔄 harvest');  
        }  
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {  
            creep.memory.upgrading = true;  
            creep.say('⚡ upgrade');  
        }  
    },  
    upgradeController: function(creep) {  
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {  
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });  
        } 
    },  
    harvestEnergy: function(creep, targetRoomName, upgradeLink, storage) {  
        if (targetRoomName === 'E54N19' && upgradeLink) {  
            if (creep.withdraw(upgradeLink, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                creep.moveTo(upgradeLink, { visualizePathStyle: { stroke: '#ffaa00' } });  
            }  
        } else if (targetRoomName === 'E56N13' && storage) {  
            if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {  
                creep.moveTo(storage, { visualizePathStyle: { stroke: '#ffaa00' } });  
            }  
        }  
    }  
};  
module.exports = roleUpgrader;