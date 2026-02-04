import { useEffect, useMemo, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Highlight from '@tiptap/extension-highlight';
import { HocuspocusProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';

const getWebSocketUrl = () => {
    if (typeof window !== 'undefined') {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.hostname;
        return `${protocol}//${host}:1234`;
    }
    return 'ws://localhost:1234';
};

export default function Editor({ currentUser }) {
    const [status, setStatus] = useState('connecting');
    const [connectedUsers, setConnectedUsers] = useState([]);

    const { ydoc, provider } = useMemo(() => {
        const ydoc = new Y.Doc();
        const provider = new HocuspocusProvider({
            url: getWebSocketUrl(),
            name: 'collaborative-document',
            document: ydoc,
            onStatus: ({ status }) => {
                setStatus(status);
            },
            onAwarenessUpdate: ({ states }) => {
                const users = Array.from(states.values())
                    .filter(state => state.user)
                    .map(state => state.user);
                setConnectedUsers(users);
            },
        });

        provider.setAwarenessField('user', currentUser);

        return { ydoc, provider };
    }, [currentUser]);

    useEffect(() => {
        return () => {
            provider.destroy();
            ydoc.destroy();
        };
    }, [provider, ydoc]);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Collaboration.configure({
                document: ydoc,
            }),
            CollaborationCursor.configure({
                provider,
                user: currentUser,
            }),
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-editor',
            },
        },
    }, [ydoc, provider, currentUser]);

    const statusColor = {
        connecting: '#FFA500',
        connected: '#4CAF50',
        disconnected: '#F44336',
    }[status] || '#999';

    return (
        <div className="editor-container">
            {/* Toolbar */}
            <div className="toolbar">
                <div className="toolbar-left">
                    <button
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'active' : ''}
                        title="Bold (Ctrl+B)"
                    >
                        <strong>B</strong>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={editor?.isActive('italic') ? 'active' : ''}
                        title="Italic (Ctrl+I)"
                    >
                        <em>I</em>
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        className={editor?.isActive('strike') ? 'active' : ''}
                        title="Strikethrough"
                    >
                        <s>S</s>
                    </button>
                    <span className="toolbar-divider" />
                    <button
                        onClick={() => editor?.chain().focus().toggleHighlight().run()}
                        className={editor?.isActive('highlight') ? 'active' : ''}
                        title="Highlight"
                    >
                        🖍️
                    </button>
                    <span className="toolbar-divider" />
                    <button
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={editor?.isActive('bulletList') ? 'active' : ''}
                        title="Bullet List"
                    >
                        •
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={editor?.isActive('orderedList') ? 'active' : ''}
                        title="Numbered List"
                    >
                        1.
                    </button>
                    <span className="toolbar-divider" />
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor?.isActive('heading', { level: 1 }) ? 'active' : ''}
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor?.isActive('heading', { level: 2 }) ? 'active' : ''}
                        title="Heading 2"
                    >
                        H2
                    </button>
                </div>

                <div className="toolbar-right">
                    <span className="status-indicator" style={{ backgroundColor: statusColor }} />
                    <span className="status-text">{status}</span>
                </div>
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="editor-content" />

            {/* Connected Users */}
            <div className="users-panel">
                <div className="users-header">
                    <span className="users-icon">👥</span>
                    <span>Online ({connectedUsers.length})</span>
                </div>
                <div className="users-list">
                    {connectedUsers.map((user, index) => (
                        <div key={index} className="user-badge" style={{ borderColor: user.color }}>
                            <span className="user-dot" style={{ backgroundColor: user.color }} />
                            <span className="user-name">
                                {user.name}
                                {user.name === currentUser.name && user.color === currentUser.color && (
                                    <span className="you-badge">you</span>
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
