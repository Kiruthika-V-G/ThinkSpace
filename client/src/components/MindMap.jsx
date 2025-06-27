import React, { useEffect, useCallback } from 'react';
import ReactFlow, {
  MiniMap, Controls, Background,
  useNodesState, useEdgesState, MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const clusterColors = {
  Definition: '#ffeaa7',
  Application: '#fab1a0',
  Technique: '#a29bfe',
  default: '#dfe6e9',
};

function MindMap({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const buildGraph = useCallback(() => {
    const flowNodes = [];
    const flowEdges = [];

    for (const cluster of data.nodes) {
      const color = clusterColors[cluster.label] || clusterColors.default;

      flowNodes.push({
        id: cluster.id,
        data: { label: cluster.label },
        position: { x: Math.random() * 400, y: Math.random() * 100 },
        style: {
          padding: 10,
          backgroundColor: color,
          borderRadius: '12px',
          fontWeight: 'bold',
          border: '2px solid #636e72',
        }
      });

      cluster.children.forEach((child, i) => {
        const childId = child.id;
        flowNodes.push({
          id: childId,
          data: { label: child.label },
          position: {
            x: Math.random() * 400 + 200,
            y: Math.random() * 100 + i * 80
          },
          style: {
            padding: 8,
            backgroundColor: '#fff',
            border: `2px solid ${color}`,
            borderRadius: '8px'
          }
        });

        flowEdges.push({
          id: `${cluster.id}->${childId}`,
          source: cluster.id,
          target: childId,
          animated: true,
          style: { stroke: '#2d3436' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#2d3436',
          },
        });
      });
    }

    if (data.relations) {
      data.relations.forEach((rel, i) => {
        flowEdges.push({
          id: `rel-${i}`,
          source: rel.source,
          target: rel.target,
          label: rel.relation,
          labelBgPadding: [4, 2],
          labelBgBorderRadius: 4,
          labelBgStyle: { fill: '#fff', color: '#2d3436', fontWeight: 'bold' },
          animated: true,
          style: { stroke: '#0984e3' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: '#0984e3',
          },
        });
      });
    }

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [data, setNodes, setEdges]);

  useEffect(() => {
    buildGraph();
  }, [buildGraph]);

  return (
    <div style={{ height: '80vh', width: '100%', marginTop: '2rem' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default MindMap;
