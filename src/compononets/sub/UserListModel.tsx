// UserListModal.tsx
import React from 'react';


interface UserListModalProps {
    isVisible: boolean;
    users: any[];
    onClose: () => void;
    onRemove: (id: number) => void;
}

const UserListModal: React.FC<UserListModalProps> = ({ isVisible, users, onClose, onRemove }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3">
                <h2 className="text-xl font-bold mb-4 text-green-600">User List</h2>
                <div className="space-y-4">
                    {users.map((user) => (
                        <div key={user.id} className="flex justify-between items-center">
                            <div>
                                <span className="font-medium">{user.email}</span>
                            </div>
                            <button
                                className="text-red-500 font-bold"
                                onClick={() => onRemove(user.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserListModal;
