class ListNode<T> {
    data: T;
    next: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    init(data: T[]) {
        this.head = null;
        this.tail = null;

        for (const item of data) {
            this.append(item);
        }
    }

    append(data: T) {
        const newNode = new ListNode(data);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
            }

            this.tail = newNode;
        }
    }

    getNextIndices(): Array[number] {
        let current = this.head;
        let list = [];

        while (current) {
            console.log(current);
            list[current.data] = current.next?.data;
            current = current.next;
        }

        return list;
    }

    getTraversalOrder(): Array<T> {
        let current = this.head;
        let list = [];

        while (current) {
            list.push(current.data);
            current = current.next;
        }

        return list;
    }
}

export const FunctionList = new LinkedList();
