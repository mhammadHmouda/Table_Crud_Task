import { Injectable } from "@angular/core";
import { User } from "../type";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class DBService {
    static id: number = 12

    data: User[] = [
        {
            id: 1,
            firstName: 'Mohammad',
            secondName: 'Mohnad',
            lastName: 'Hmoudah',
            age: 21
        },
        {
            id: 2,
            firstName: 'Ahmad',
            secondName: 'Mohammad',
            lastName: 'Omar',
            age: 22
        },
        {
            id: 3,
            firstName: 'Loai',
            secondName: 'Yousef',
            lastName: 'Masri',
            age: 21
        },
        {
            id: 4,
            firstName: 'Muthana',
            secondName: 'Abo',
            lastName: 'Alezz',
            age: 19
        },
        {
            id: 5,
            firstName: 'Jehad',
            secondName: 'Sanad',
            lastName: 'Lefdawy',
            age: 21
        },
        {
            id: 6,
            firstName: 'Muhammad',
            secondName: 'A.',
            lastName: 'Qzih',
            age: 22
        },
        {
            id: 7,
            firstName: 'Karam',
            secondName: 'Rami',
            lastName: 'Hazza',
            age: 20
        },
        {
            id: 8,
            firstName: 'Jane',
            secondName: 'Doe',
            lastName: 'Smith',
            age: 25
        },
        {
            id: 9,
            firstName: 'Mohammad',
            secondName: 'Mohnad',
            lastName: 'Hmoudah',
            age: 21
        },
        {
            id: 10,
            firstName: 'Loai',
            secondName: 'Yousef',
            lastName: 'Masri',
            age: 21
        },
        {
            id: 11,
            firstName: 'Ahmad',
            secondName: 'Mohammad',
            lastName: 'Omar',
            age: 22
        },
        {
            id: 12,
            firstName: 'John',
            secondName: 'Pert',
            lastName: 'Smoth',
            age: 29
        }
    ];

    private dataSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.data);
    private searchUserSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

    getUsers(): User[] {
        return this.data;
    }

    getUsersObservable(): BehaviorSubject<User[]> {
        return this.dataSubject;
    }

    searchUserObservable(): BehaviorSubject<string> {
        return this.searchUserSubject;
    }

    addUser(item: User): void {
        item.id = ++DBService.id;
        item = this.truncateStrings(item);
        this.data.push(item);
        this.dataSubject.next(this.data);
    }

    deleteUser(id: number): void {
        const index = this.data.findIndex(data => data.id === id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this.dataSubject.next(this.data);
        }
    }

    updateUser(item: User): void {
        item = this.truncateStrings(item);
        const index = this.data.findIndex(data => data.id === item.id);
        if (index !== -1) {
            this.data[index] = item;
            this.dataSubject.next(this.data);
        }
    }

    searchUsers(query: string): void {      
        this.searchUserSubject.next(query);
    }

    truncateStrings(user: User): User {
        const truncatedUser: User = { ...user };
        for (const key in truncatedUser) {
            if (typeof truncatedUser[key as keyof User] === 'string' && (truncatedUser[key as keyof User] as string).length > 15) {
                truncatedUser[key as keyof User] = (truncatedUser[key as keyof User] as string).substr(0, 15) + '...' as never;
            }
        }
        return truncatedUser;
    }
}