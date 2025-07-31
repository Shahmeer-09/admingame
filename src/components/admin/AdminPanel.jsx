import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserDialog } from './UserDialog';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';
import { Search, Plus, Edit, Trash2, RotateCcw, LogOut } from 'lucide-react';

export const AdminPanel = ({ onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.location && user.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const loadUsers = async () => {
    try {
      const data = await authService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setShowUserDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    try {
      await authService.deleteUser(userToDelete.id);
      toast.success('User deleted successfully');
      loadUsers();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  const handleResetPassword = async (user) => {
    setIsResettingPassword(true);
    try {
      await authService.triggerPasswordReset(user.id);
      toast.success(`Password reset email sent to ${user.email}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResettingPassword(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-slate-400 mt-1">Manage users and system settings</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Welcome, {user?.name}</span>
            <Button
              onClick={logout}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">User Management</CardTitle>
            <CardDescription className="text-slate-400">
              Manage all users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <Button
                onClick={handleCreateUser}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner className="w-8 h-8" />
                <span className="ml-2 text-slate-400">Loading users...</span>
              </div>
            ) : (
              <div className="rounded-md border border-slate-700">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Email</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Last Login</TableHead>
                      <TableHead className="text-slate-300">Location</TableHead>
                      <TableHead className="text-slate-300">Reports</TableHead>
                      <TableHead className="text-slate-300">Email Reports</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="border-slate-700">
                        <TableCell className="text-slate-300">{user.email}</TableCell>
                        <TableCell className="text-slate-300">{user.name}</TableCell>
                        <TableCell className="text-slate-400">{formatDate(user.lastLogin)}</TableCell>
                        <TableCell className="text-slate-400">{user.location || '-'}</TableCell>
                        <TableCell className="text-slate-400">{user.numberOfReports}</TableCell>
                        <TableCell className="text-slate-400">{user.reportsEmailedSuccessfully}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => handleEditUser(user)}
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => handleResetPassword(user)}
                              size="sm"
                              variant="outline"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                              disabled={isResettingPassword}
                            >
                              <RotateCcw className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => setUserToDelete(user)}
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400 hover:bg-red-950"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-slate-400 py-8">
                          {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <UserDialog
          isOpen={showUserDialog}
          onClose={() => setShowUserDialog(false)}
          user={selectedUser}
          onSuccess={loadUsers}
        />

        <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteUser}
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};