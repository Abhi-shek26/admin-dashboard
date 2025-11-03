import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TopUser {
  name: string;
  email: string;
  averageScore: number;
  analysisCount: number;
}

interface TopUsersTableProps {
  users: TopUser[];
}

const TopUsersTable: React.FC<TopUsersTableProps> = ({ users }) => {
  return (
    <Table>
      <TableCaption>A list of the top 5 users with the highest average CV scores.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Analyses</TableHead>
          <TableHead className="text-right">Average Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.email}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.analysisCount}</TableCell>
            <TableCell className="text-right font-bold">{user.averageScore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopUsersTable;
